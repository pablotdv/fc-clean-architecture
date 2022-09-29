import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository()
        const productFindUseCase = new FindProductUseCase(productRepository)

        const output = await productFindUseCase.execute({ id: "1" })

        expect(output).toEqual({
            id: "1",
            name: product.name,
            price: product.price,
        })
    });

    it("should thrown an error when product not found", async () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const productFindUseCase = new FindProductUseCase(productRepository)        

        await expect(productFindUseCase.execute({ id: "2" })).rejects.toThrow("Product not found")
    });
});
