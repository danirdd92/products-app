import { faker as f } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCTS_TO_CREATE = 20;

const seed = async () => {
  const productsData = [...Array(PRODUCTS_TO_CREATE).keys()].map(() => {
    return {
      name: f.commerce.productName(),
      description: f.commerce.productDescription(),
      price: f.commerce.price(50, 150),
      image: f.image.abstract(320, 240, true),
    };
  });

  const createProducts = productsData.map((prod) =>
    prisma.product.create({ data: prod })
  );

  await prisma.$transaction(createProducts);
};

seed();
