
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const products = [new Product("1", "Product", 10),
new Product("2", "Product 2", 20)];

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list product use case", () => {
    it("should list products", async () => {
        const productRepository = MockRepository()
        const productListUseCase = new ListProductUseCase(productRepository)

        const output = await productListUseCase.execute()

        expect(output).toEqual({
            products: [
                {
                    id: "1",
                    name: products[0].name,
                    price: products[0].price,
                },
                {
                    id: "2",
                    name: products[1].name,
                    price: products[1].price,
                }
            ]
        })
    });
});

