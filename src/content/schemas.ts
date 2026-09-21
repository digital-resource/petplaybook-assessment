import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "websiteButtonLabel": z.string(),
        "websiteButtonUrl": z.string(),
        "description": z.string(),
        "formLabel": z.string(),
        "buttonLabel": z.string(),
        "confirmation": z.string(),
        "finePrint": z.string()
      }),
      "supporting": z.object({
        "title": z.string(),
        "description": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;