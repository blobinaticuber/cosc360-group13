import { Router } from "express";
import type { Types } from "mongoose";
import db, {
	type Admin,
	type Listing,
	type Report,
	type User,
} from "../database/db.js";
import Status from "../types/Status.js";
import type { BookDetails } from "../util/bookSchema.js";
import { encrypt } from "../util/encryption.js";

const testing = Router();

let seededData: null | {
	users: (User & { id: string })[];
	admins: (Admin & { id: string })[];
	listings: (Listing & { id: string })[];
	reports: (Report & { id: string })[];
} = null;

const BOOKS: BookDetails[] = [
	{
		"id": "X73mDwAAQBAJ",
		"authors": [
			"Lady Colin Campbell",
		],
		"categories": [
			"Biography & Autobiography",
		],
		"description":
			"**A Wall Street Journal bestseller** This blockbuster narrative provides the first behind-the-scenes, authoritative account of the Duke and Duchess of Sussex’s marriage, by the New York Times bestselling author of Diana in Private. The fall from popular grace of Prince Harry, the previously adulated brother of the heir to the British throne, as a consequence of his marriage to the beautiful and dynamic Hollywood actress and \"Suits star\" Meghan Markle, makes for fascinating reading in this groundbreaking book from Lady Colin Campbell, who is the New York Times bestselling biographer of books on Princess Diana, the Queen Mother, and Queen Elizabeth’s marriage. With a unique breadth of insight, Lady Colin Campbell goes behind the scenes, speaking to friends, relations, courtiers, and colleagues on both sides of the Atlantic to reveal the most unexpected royal story since King Edward VIII's abdication. She highlights the dilemmas involved and the issues that lurk beneath the surface, revealing why the couple decided to step down as senior royals. She analyses the implications of the actions of a young and ambitious Duke and Duchess of Sussex, in love with each other and with the empowering lure of fame and fortune, and leads the reader through the maze of contradictions Meghan and Harry have created—while also evoking the Californian culture that has influenced the couple's conduct. Meghan and Harry: The Real Story exposes how the royal couple tried and failed to change the royal system—by adapting it to their own needs and ambitions—and, upon failing, how they decided to create a new system—and life—for themselves.",
		"image":
			"http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "Meghan and Harry: The Real Story",
		"publishDate": "2020-07-28",
	},
	{
		"id": "7hFjDwAAQBAJ",
		"authors": [
			"William Silvester",
		],
		"categories": [
			"Antiques & Collectibles",
		],
		"description":
			"Action Figures, Books, Ornaments, Costumes, Calendars, Art, Coins, Dolls, Jewelry, Lunch Boxes, Toys, Movies Harry Potter Casts His Spell on Collectors Welcome, Muggles, to the magic, mystery, and merchandise of the wonderful wizarding world of Harry Potter! Harry Potter Collector's Handbook will bewitch you with colorful images and current values of licensed products based on the famous boy wizard and his charming chums and nefarious foes. Just for you, we've conjured: • 1,000+ spellbinding listings, pictures, and secondary market values. • Information arranged—magically!—in alphabetical order to make it easy to find what you're looking for. • A diverse array of collectibles from rare first editions of books worth thousands of dollars to items worth slightly fewer galleons. If you're mesmerized by \"Pottermania,\" you'll never want to depart the enchanting world of witchcraft and wizardry presented in Harry Potter Collector's Handbook.",
		"image":
			"http://books.google.com/books/content?id=7hFjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "Harry Potter Collector's Handbook",
		"publishDate": "2010-08-19",
	},
	{
		"id": "aOqMEAAAQBAJ",
		"authors": [
			"J.K. Rowling",
		],
		"categories": [
			"Juvenile Fiction",
		],
		"description":
			"Harry Potter begins his sixth year at Hogwarts School of Witchcraft and Wizardry in an atmosphere of uncertainty, as the magical world begins to face the fact that the evil wizard Voldemort is alive and active once again.",
		"image":
			"http://books.google.com/books/content?id=aOqMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
		"title": "Harry Potter and the Half-Blood Prince",
		"publishDate": "2005-07-16",
	},
	{
		"id": "E5V4zfHYaw0C",
		"authors": [
			"Melissa Anelli",
		],
		"rating": 3,
		"categories": [
			"Fiction",
		],
		"description":
			"A new enhanced e-book edition, featuring an extended transcript from Melissa Anelli's exclusive interview with J. K. Rowling and a new, updated chapter! Melissa Anelli wears a ring that was a gift to her from J.K. Rowling, given as a measure of appreciation for the work she does on The Leaky Cauldron, where her job entails being a fan, reporter, guardian, and spokesperson for the Harry Potter series. For ten years, millions of fans have lived inside literary history, the only fans to know what it was like when Harry Potter was unfinished. When anticipation for a book was just as likely to cause a charity drive as a pistol shootout. When millions of rabid fans looked to friends, families, neighbors, forums, discussion groups, fan fiction and podcasts to get their fix between novels. When the death of a character was a hotter bet than who'd win the World Series. When one series of books had the power to change the way books are read. This has been a time when a book was more popular than movies, television, and video games. The series has spawned a generation of critical thinkers and new readers. The New York Times changed the way it reported book sales just to avoid a continual overpowering of its bestseller list. These events must be given their proper context, and this moment must be preserved. The series will remain important to literature and pop culture, but the experience will change. Harry's fate will be as commonly known as the identity of Luke Skywalker's father, and readers who never had to wait for a Harry Potter book will have no idea what transpired when the series had hundreds of millions of people waiting desperately for the next volume. We are the first wave of Harry Potter fans, the ones that are living in the time that shapes how Harry Potter will be remembered for all time. But when this era is over, fans will need some way to remember this strange, wonderful, dizzying experience. Future fans, too, will want to know what they missed. Harry Potter will exist as a seven-book series, but without the indivisible story of the cultural, literary and emotional impact the series has made, the story is incomplete. How can a fan understand Harry Potter without hearing about the midnight book parties, the scams, the theories, the burglaries, the bets, the bannings, and most importantly, the worldwide camaraderie spurred on by mutual love of a boy wizard? How can they know how Harry Potter changed and touched the lives of so many without hearing it first hand? Harry, A History tells this story. It tells the personal story of Melissa Anelli's journey through the very heart of Harry Potter fandom. And wraps this phenomenon up into one narrative, factual volume – one book that tells what happened when Harry Potter met the world.",
		"image":
			"http://books.google.com/books/content?id=E5V4zfHYaw0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title":
			"Harry, A History - Now Updated with J.K. Rowling Interview, New Chapter & Photos: The True Story of a Boy Wizard, His Fans, and Life Inside the Harry Potter Phenomenon",
		"publishDate": "2008-11-04",
	},
	{
		"id": "HNQHAQAAMAAJ",
		"authors": [
			"J. K. Rowling",
		],
		"rating": 4.5,
		"categories": [
			"Juvenile Fiction",
		],
		"description":
			"Harry Potter è ormai celebre: durante il primo anno alla Scuola di Magia e Stregoneria di Hogwarts ha sconfitto il terribile Voldemort, vendicando la morte dei suoi genitori e coprendosi di gloria. Ma una spaventosa minaccia incombe sulla scuola: un incantesimo che colpisce i compagni di Harry uno dopo l'altro, e che sembra legato a un antico mistero racchiuso nella tenebrosa Camera dei Segreti. Harry e i suoi amici sfideranno oscure magie e terribili mostri, parleranno con i gufi e viaggeranno in automobili volanti, in un percorso magico dal ritmo incalzante e dalla sequenza infinita, come da scatole cinesi. Età di lettura: da 10 anni.",
		"image":
			"http://books.google.com/books/content?id=HNQHAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
		"title": "Harry Potter e la camera dei segreti: romanzo",
		"publishDate": "1999",
	},
	{
		"id": "gCtazG4ZXlQC",
		"authors": [
			"J.K. Rowling",
		],
		"rating": 4.5,
		"categories": [
			"Juvenile Fiction",
		],
		"description":
			"'Give me Harry Potter,' said Voldemort's voice, 'and none shall be harmed. Give me Harry Potter, and I shall leave the school untouched. Give me Harry Potter, and you will be rewarded.' As he climbs into the sidecar of Hagrid's motorbike and takes to the skies, leaving Privet Drive for the last time, Harry Potter knows that Lord Voldemort and the Death Eaters are not far behind. The protective charm that has kept Harry safe until now is broken, but he cannot keep hiding. The Dark Lord is breathing fear into everything Harry loves and to stop him Harry will have to find and destroy the remaining Horcruxes. The final battle must begin - Harry must stand and face his enemy... Having become classics of our time, the Harry Potter eBooks never fail to bring comfort and escapism. With their message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
		"image":
			"http://books.google.com/books/content?id=gCtazG4ZXlQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "Harry Potter and the Deathly Hallows",
		"publishDate": "2015-12-08",
	},
	{
		"id": "LHG3OEuMjFwC",
		"authors": [
			"Joanne Kathleen Rowling",
		],
		"categories": [
			"Juvenile Fiction",
		],
		"description":
			"Harry Potter que pensa destar un gojat ordinari, dinc un gigant de las subercilhas espeluhadas eu vieni sauvar, que sinscrivi a Hogwarts, lescòla de broishami, quapreni a har au quidditch, e ques bati en un duèl mortau. La rason HARRY POTTER QUEI UN BROISH!",
		"image":
			"http://books.google.com/books/content?id=LHG3OEuMjFwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "Harry Potter e la pèira filosofau",
		"publishDate": "2009",
	},
	{
		"id": "KOCcEAAAQBAJ",
		"authors": [
			"Jo Nesbo",
		],
		"categories": [
			"Fiction",
		],
		"description":
			'The first book in the remarkable, bestselling Harry Hole series from Jo Nesbo. "A stunning opening to the series." —Sunday Times "Jo Nesbo is my favorite thriller writer." —Michael Connelly Oslo detective Harry Hole is sent to Sydney, Australia, to assist the local police in their investigation of the brutal rape and murder of Inger Holter, a young, blonde Norwegian woman who was working in a restaurant. Initially sidelined as an outsider, Harry becomes central to the investigation when the police realize that Inger may be only the latest victim in a number of unsolved rape and murder cases around the country. Inger had a number of admirers, each with his own share of secrets, but there is no obvious suspect and the pattern of the other crimes seems impossible to crack. Then a circus performer is brutally murdered, followed by yet another young woman. And Harry is in a race against time to stop a highly intelligent killer who is bent on total destruction.',
		"image":
			"http://books.google.com/books/content?id=KOCcEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "The Bat: Harry Hole 1",
		"publishDate": "2023-02-28",
	},
	{
		"id": "9dbPAQAACAAJ",
		"authors": [
			"J. K. Rowling",
		],
		"rating": 4.5,
		"categories": [
			"England",
		],
		"description":
			"Harry Potter begins his sixth year at Hogwarts School of Witchcraft and Wizardry in an atmosphere of uncertainty, as the magical world begins to face the fact that the evil wizard Voldemort is alive and active once again.",
		"image":
			"http://books.google.com/books/content?id=9dbPAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
		"title": "Harry Potter and the Half-Blood Prince",
		"publishDate": "2006-09",
	},
	{
		"id": "wHlDzHnt6x0C",
		"authors": [
			"J.K. Rowling",
		],
		"rating": 4.5,
		"categories": [
			"Juvenile Fiction",
		],
		"description":
			"'Welcome to the Knight Bus, emergency transport for the stranded witch or wizard. Just stick out your wand hand, step on board and we can take you anywhere you want to go.' When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss... Having become classics of our time, the Harry Potter eBooks never fail to bring comfort and escapism. With their message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
		"image":
			"http://books.google.com/books/content?id=wHlDzHnt6x0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		"title": "Harry Potter and the Prisoner of Azkaban",
		"publishDate": "2015-12-08",
	},
];
const randomBook = () => {
	return BOOKS[Math.floor(Math.random() * BOOKS.length)] as BookDetails;
};

testing.put(
	"/setup",
	async (_, res) => {
		if (seededData != null) {
			res.status(Status.OK).json(seededData);
			return;
		}

		seededData = {
			users: [],
			admins: [],
			listings: [],
			reports: [],
		};

		const SEED = Math.floor(Math.random() * 100000);

		const USER_COUNT = 10;
		const ADMIN_COUNT = 2;
		const LISTINGS_PER_USER = 10;
		const PROBABILITY_OF_UNAVAILABLE = 0.3;
		const REPORT_PROBABILITY = 0.05;

		for (let i = 0; i < USER_COUNT; i++) {
			const details: User = {
				name: `User ${i} ${SEED}`,
				email: `user${i}_${SEED}@email.com`,
				password: encrypt(`pass`),
				profilePicture: process.env.SERVER_URL +
					"/public/default_profile_picture.jpg",
			};
			const newUser = new db.User(details);
			const seededUser = await newUser.save();
			seededData.users.push({
				...details,
				password: "pass",
				id: seededUser._id.toString(),
			});
		}

		for (let i = 0; i < ADMIN_COUNT; i++) {
			const details: Admin = {
				name: `User ${i} ${SEED}`,
				email: `user${i}_${SEED}@email.com`,
				password: encrypt(`pass`),
				profilePicture: process.env.SERVER_URL +
					"/public/default_profile_picture.jpg",
			};
			const newAdmin = new db.Admin(details);
			const seededAdmin = await newAdmin.save();
			seededData.admins.push({
				...details,
				password: "pass",
				id: seededAdmin._id.toString(),
			});
		}

		for (const user of seededData.users) {
			for (let i = 0; i < LISTINGS_PER_USER; i++) {
				const details: Listing = {
					book: randomBook(),
					user: user.id as unknown as Types.ObjectId,
					available: Math.random() > PROBABILITY_OF_UNAVAILABLE,
				};
				const newListing = new db.Listing(details);
				const seededListing = await newListing.save();
				seededData.listings.push({
					...details,
					id: seededListing._id.toString(),
				});
			}
		}

		for (const userA of seededData.users) {
			for (const userB of seededData.users) {
				if (userA == userB) continue;

				if (Math.random() < REPORT_PROBABILITY) {
					const details: Report = {
						submittedBy: userA.id as unknown as Types.ObjectId,
						user: userB.id as unknown as Types.ObjectId,
						explanation: "Test report message.",
					};
					const newReport = new db.Report(details);
					const seededReport = await newReport.save();
					seededData.reports.push({
						...details,
						id: seededReport._id.toString(),
					});
				}
			}
		}

		res.status(Status.OK).json(seededData);
	},
);

testing.delete(
	"/teardown",
	async (_, res) => {
		if (seededData == null) {
			res.status(Status.OK).end();
			return;
		}

		while (seededData.users.length > 0) {
			const user = seededData.users.pop();
			const record = await db.User.findById(user!.id).exec();
			if (record != null) {
				record.deleteOne().exec();
			}
			const userReports = await db.Report.find({ user: user!.id }).exec();
			for (const report of userReports) {
				await report.deleteOne();
			}
			const userSessions = await db.Session.find({
				user: user!.id,
			}).exec();
			for (const session of userSessions) {
				await session.deleteOne();
			}
		}

		while (seededData.admins.length > 0) {
			const admin = seededData.admins.pop();
			const record = await db.Admin.findById(admin!.id).exec();
			if (record != null) {
				record.deleteOne().exec();
			}
			const adminSessions = await db.AdminSession.find({
				user: admin!.id,
			}).exec();
			for (const session of adminSessions) {
				await session.deleteOne();
			}
		}

		while (seededData.listings.length > 0) {
			const listing = seededData.listings.pop();
			const record = await db.Listing.findById(listing!.id).exec();
			if (record != null) {
				record.deleteOne().exec();
			}
		}

		seededData = null;

		res.status(Status.OK).end();
	},
);

export default testing;
