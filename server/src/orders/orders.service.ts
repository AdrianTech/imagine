import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeliveryOption } from 'src/admin/delivery-options/entities/delivery-option.entity';
import { Product } from 'src/products/entities/product.entity';
import Helpers from 'src/shared/classes/Helpers';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProductsDto } from './dto/order-products.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { IproductListHandle } from './interfaces';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(DeliveryOption) private readonly deliveryRepository: Repository<DeliveryOption>
  ) { }

  async create(body: CreateOrderDto) {
    const { purchases, totalPrice, totalItems } = await this.productListHandle(body.productsList, body.deliver);
    body.productsList = purchases;
    body.totalItems = totalItems;
    body.totalPrice = totalPrice;
    const order = this.orderRepository.create(body);
    return this.orderRepository.save(order);
  }

  async findAll(query: PaginateQuery,): Promise<Paginated<CreateOrderDto>> {
    return await paginate(query, this.orderRepository, {
      relations: ["deliver"],
      sortableColumns: ['id', 'createdAt', 'updatedAt', 'totalPrice', 'totalItems', 'email', 'voivodeship'],
      searchableColumns: ['name', 'city', 'address', 'zipcode', 'surname', 'phone', 'voivodeship', 'email'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        finalized: [FilterOperator.EQ]
      },
      defaultLimit: 10,
    })
  }

  async findOne(id: string) {
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order: Order = await this.orderRepository.findOneBy({ id });
    if (updateOrderDto.finalized) order.finalizationDate = new Date();
    else if (updateOrderDto.finalized === false) order.finalizationDate = null;
    if (!order) throw new NotFoundException();
    return this.orderRepository.save({ ...order, ...updateOrderDto });
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }

  private async productListHandle(productList: object[], id: any): Promise<IproductListHandle> {
    const ids: number[] = productList.map((product: OrderProductsDto) => product.id);
    if (!ids.length) throw new NotFoundException("Nie dodano żandnych produktów");
    const products: Product[] = await this.productRepository.find({ where: { id: In(ids) } });
    const deliverCost: DeliveryOption = await this.deliveryRepository.findOneBy({ id });
    const purchases: OrderProductsDto[] = products.map((product: Product) => {

      const newObj: OrderProductsDto = { discount_price: null, price: product.price, title: product.title, id: product.id, quantity: 0, total: 0 };

      productList.forEach((item: OrderProductsDto) => {
        if (item.id === product.id) newObj.quantity = item.quantity;
      })

      if (Helpers.checkIfPromotion(product.discount_start, product.discount_end)) {
        newObj.discount_price = product.discount_price;
        newObj.total = newObj.discount_price * newObj.quantity;
      }
      else newObj.total = newObj.price * newObj.quantity;

      return newObj;
    })

    const totalPrice = Helpers.calculate(purchases, 'total', '+');
    const totalItems = Helpers.calculate(purchases, 'quantity', '+');

    return { purchases, totalPrice: totalPrice + deliverCost.price, totalItems }
  }
}
