import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
describe("Test list product use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        productRepository.create(new Product("1", "Product", 10));
        productRepository.create(new Product("2", "Product 2", 20));
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute();
        expect(output).toEqual({
            products: [{
                id: "1",
                name: "Product",
                price: 10,
            },
            {
                id: "2",
                name: "Product 2",
                price: 20,
            }]
        });
    });
});