export const matchRoles = (key: string, roles: string[]): boolean => {
    return roles.some((role) => role === key ? true : false)
}