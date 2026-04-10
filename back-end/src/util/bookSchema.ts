import z from "zod"

export const BookDetailsSchema = z.object({
	id: z.string().meta({ 
		description: "The ID of this book/volume in the Google Books database." 
	}),
	authors: z.array(z.string()).meta({
		description: "The authors of this book."
	}),
	rating: z.number().min(1).max(5).optional().nullable().meta({
		description: "The average rating (1 to 5) of this book on Google."
	}),
	categories: z.array(z.string()).meta({
		description: "The categories of this booke, e.g. \"Fiction\", \"Suspense\"."
	}),
	description: z.string().meta({
		description: "An HTML string containing a description of the book."
	}),
	image: z.string().meta({
		description: "A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value."
	}),
	title: z.string().meta({
		description: "The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like \"Title: Subtitle\"."
	}),
	publishDate: z.string().optional().meta({
		description: "The publication date of the book."
	})
})

export type BookDetails = z.infer<typeof BookDetailsSchema>
