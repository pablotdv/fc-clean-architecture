import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const input = new Product("1", "Product", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(input)),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    }
}

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository()
        const productUpdateUseCase = new UpdateProductUseCase(productRepository)
    
        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });
});
