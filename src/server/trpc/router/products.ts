import { z } from "zod";
import { faker as f } from "@faker-js/faker";

import { router, publicProcedure as t } from "../trpc";

export const productsRouter = router({
  list: t.query(async ({ ctx: { prisma } }) => {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
      },
    });
  }),

  upsert: t
    .input(
      z.object({
        id: z.string().optional(),
        image: z.string().optional(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      if (input.id) {
        return await prisma.product.update({
          data: input,
          where: {
            id: input.id,
          },
        });
      } else {
        const image = f.image.abstract(320, 240, true);
        const product = { ...input, image };
        return await prisma.product.create({
          data: product,
        });
      }
    }),

  remove: t
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      return await prisma.product.delete({
        where: {
          id,
        },
      });
    }),
});
