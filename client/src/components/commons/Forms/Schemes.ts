
const getCurrentDate = () => new Date().toISOString().slice(0, 10);

export const productScheme = [
    { $formkit: 'text', name: "title", label: "Tytuł lub nazwa", help: "", validation: "required|length:5,100", placeholder: "" },
    { $formkit: 'text', name: "description", label: "Opis", help: "", validation: "required|length:10, 500", placeholder: "" },
    { $formkit: 'file', name: "files", label: "Zdjęcia", help: "tylko plik typu jpg, jpeg, png", validation: "", accept: '.jpg,.jpeg,.png', multiple: true },
    {
        $formkit: 'number', name: "price", label: "Cena", help: "", validation: "required|number|min:1",
        validationMessages: { min: "Minimum 1 zł" }, step: '0.01',
    },
    { $formkit: 'number', name: "discount_price", label: "Przecena", help: "", validation: "number|min:1" },
    { $formkit: 'date', name: "discount_start", label: "Początek przeceny", help: "", validation: `after:2022-12-12`, min: getCurrentDate() },
    { $formkit: 'date', name: "discount_end", label: "Koniec przeceny", help: "", validation: "", min: getCurrentDate() },
    { $formkit: 'number', name: "dimension_x", label: "Szerokość", help: "", validation: "required|number|min:1" },
    { $formkit: 'number', name: "dimension_y", label: "Wysokość", help: "", validation: "required|number|min:1" },
    { $formkit: 'text', name: "production_year", label: "Rok produkcji", help: "", validation: "required|", id: 'year' },
    { $formkit: 'checkbox', name: "isAvailable", label: "Dostępny", help: "", validation: "" },
    { $formkit: 'hidden', name: "isAvailable", label: "Dostępny", help: "", validation: "" },
    { $formkit: 'text', name: "technique", label: "Technika", help: "", validation: "required|length: 3,100" },
    { $formkit: 'text', name: "style", label: "Styl", help: "", validation: "required|length: 3,100" },
    { $formkit: 'text', name: "base", label: "Podkład", help: "", validation: "required|length: 3,100" },
]

export const filterProductScheme = [
    { $formkit: 'text', name: "production_year", label: "Rok produkcji", help: "", validation: "number" },
    { $formkit: 'text', name: "style", label: "Styl", help: "", validation: "length: 3,100" },
    { $formkit: 'text', name: "base", label: "Podkład", help: "", validation: "length: 3,100" },
    {
        $formkit: 'range', name: "rangePriceFrom", label: "Cena Od: $rangePriceFrom", help: "", validation: "number|min:1",
        min: '100', max: '10000'
    },
]


