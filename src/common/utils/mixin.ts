export default function mixin(baseCtor: any) {
    return targetClass => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(
                targetClass.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
            );
        });
    }
}