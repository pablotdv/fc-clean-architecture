import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";
import { v4 as uuid } from "uuid";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(): Promise<OutputListProductDto> {
        const product = await this.productRepository.findAll();

        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}