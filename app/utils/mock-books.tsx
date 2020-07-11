import * as MockAuthors from './mock-authors';
import * as MockGenres from './mock-genres';
import { Book, LocalBook } from '../types';

export const mockBooksOld: Book[] = [
  {
    id: "book01",
    title: "The Tempest",
    authors: [ MockAuthors.shakespeare ],
    authorIds: [ MockAuthors.shakespeare.id ],
    genres: [MockGenres.classics, MockGenres.plays, MockGenres.drama],
    genreIds: [ MockGenres.classics.id, MockGenres.plays.id, MockGenres.drama.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546081115l/12985.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: undefined,
  },
  {
    id: "book02",
    title: "The Alchemist",
    authors: [ MockAuthors.pauloCoelho ],
    authorIds: [ MockAuthors.pauloCoelho.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.fantasy, MockGenres.philosophy ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.fantasy.id, MockGenres.philosophy.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
    sypnosis: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different, and far more satisfying, listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, to follow our dreams.",
  },
  {
    id: "book03",
    title: "The Great Gatsby",
    authors: [ MockAuthors.fitzgerald ],
    authorIds: [ MockAuthors.fitzgerald.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.fantasy ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.fantasy.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671._SY475_.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: 'http://ipv4.download.thinkbroadband.com/10MB.zip',
  },
  {
    id: "book04",
    title: "The Little Prince",
    authors: [ MockAuthors.saintExupery ],
    authorIds: [ MockAuthors.saintExupery.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.childrens, MockGenres.fantasy ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.childrens.id, MockGenres.fantasy.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1367545443l/157993.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://speed.hetzner.de/100MB.bin',
  },
  {
    id: "book05",
    title: "And Then There Were None",
    authors: [ MockAuthors.agathaChristie ],
    authorIds: [ MockAuthors.agathaChristie.id ],
    genres: [ MockGenres.classics, MockGenres.mystery, MockGenres.crime, MockGenres.thriller ],
    genreIds: [ MockGenres.classics.id, MockGenres.mystery.id, MockGenres.crime.id, MockGenres.thriller.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391120695l/16299.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'http://ipv4.download.thinkbroadband.com/5MB.zip',
  },
  {
    id: "book06",
    title: "The Catcher in the Rye",
    authors: [ MockAuthors.salinger, MockAuthors.shakespeare ],
    authorIds: [ MockAuthors.salinger.id, MockAuthors.shakespeare.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.literature ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.literature.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1398034300l/5107.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book07",
    title: "The Old Man and the Sea",
    authors: [ MockAuthors.hemingway ],
    authorIds: [ MockAuthors.hemingway.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.literature ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.literature.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1329189714l/2165.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book08",
    title: "The Time Machine",
    authors: [ MockAuthors.hgWells, MockAuthors.shakespeare ],
    authorIds: [ MockAuthors.hgWells.id, MockAuthors.shakespeare.id ],
    genres: [ MockGenres.classics, MockGenres.scifi, MockGenres.fantasy ],
    genreIds: [ MockGenres.classics.id, MockGenres.scifi.id, MockGenres.fantasy.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327942880l/2493.jpg",
    ratingValue: 4,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book09",
    title: "A Study in Scarlet",
    authors: [ MockAuthors.conanDoyle ],
    authorIds: [ MockAuthors.conanDoyle.id ],
    genres: [ MockGenres.classics, MockGenres.mystery, MockGenres.fiction, MockGenres.crime ],
    genreIds: [ MockGenres.classics.id, MockGenres.mystery.id, MockGenres.fiction.id, MockGenres.crime.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519031842l/102868._SX318_.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book10",
    title: "Spice & Wolf, Vol. 01",
    authors: [ MockAuthors.iHasekura, MockAuthors.jAyakura ],
    authorIds: [ MockAuthors.iHasekura.id, MockAuthors.jAyakura.id ],
    genres: [ MockGenres.fantasy, MockGenres.lightNovel, MockGenres.fiction, MockGenres.romance ],
    genreIds: [ MockGenres.fantasy.id, MockGenres.lightNovel.id, MockGenres.fiction.id, MockGenres.romance.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1340904653l/6483360.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book11",
    title: "Durarara!!, Vol. 1",
    authors: [ MockAuthors.rNarita, MockAuthors.sYasuda ],
    authorIds: [ MockAuthors.rNarita.id, MockAuthors.sYasuda.id ],
    genres: [ MockGenres.fantasy, MockGenres.lightNovel, MockGenres.fiction, MockGenres.mystery ],
    genreIds: [ MockGenres.fantasy.id, MockGenres.lightNovel.id, MockGenres.fiction.id, MockGenres.mystery.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1431851926l/24409126._SY475_.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book12",
    title: "1984",
    authors: [ MockAuthors.georgeOrwell ],
    authorIds: [ MockAuthors.georgeOrwell.id ],
    genres: [ MockGenres.classics, MockGenres.fiction, MockGenres.politics, MockGenres.dystopia ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id, MockGenres.politics.id, MockGenres.dystopia.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SX318_.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
  {
    id: "book13",
    title: "To Kill a Mockingbird",
    authors: [ MockAuthors.harperLee ],
    authorIds: [ MockAuthors.harperLee.id ],
    genres: [ MockGenres.classics, MockGenres.fiction ],
    genreIds: [ MockGenres.classics.id, MockGenres.fiction.id ],
    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg",
    ratingValue: 4.5,
    ratingCount: 420,
    downloadLink: 'https://firebasestorage.googleapis.com/v0/b/fb-cloud-functions-demo-4de69.appspot.com/o/PointyPixelPenetration_2018jan.pdf?alt=media&token=f6a55e4d-eb08-47e1-a122-ac9aabca1b34',
  },
]

export const mockBooks: Book[] = [
  {
    id: "5ef776a4047c43aee059fadc",
    createAt: "0001-01-01T00:00:00Z",
    releaseAt: "2006-03-28T00:00:00Z",
    title: "The Da Vinci Code",
    genreIds: [
        "5ee63704667dda1439c29a9f",
        "5ee6370c667dda1439c29aa0",
        "5ee636b5667dda1439c29a97",
        "5ee63696667dda1439c29a94"
    ],
    authorIds: [
        "5eede3a20692184d96c0b4d1"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2Fdownload.jpg?alt=media&token=82366fec-a697-4ef9-bf10-0e250e128119",
    sypnosis: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.  Even more startling, the late curator was involved in the Priory of Sion—a secret society whose members included Sir Isaac Newton, Victor Hugo, and Da Vinci—and he guarded a breathtaking historical secret. Unless Langdon and Neveu can decipher the labyrinthine puzzle—while avoiding the faceless adversary who shadows their every move—the explosive, ancient truth will be lost forever.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FTheDaVinciCode_201308_The%2BDa%2BVinci%2BCode.epub?alt=media&token=dd2d2131-3e6c-454b-9303-c127736b9401",
    genres: [
        {
            id: "5ee63704667dda1439c29a9f",
            name: "Crime"
        },
        {
            id: "5ee6370c667dda1439c29aa0",
            name: "Thriller"
        },
        {
            id: "5ee636b5667dda1439c29a97",
            name: "Mystery"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        }
    ],
    authors: [
        {
            id: "5eede3a20692184d96c0b4d1",
            name: "Dan Brown",
            about: "Dan Brown is the author of numerous #1 bestselling novels, including The Da Vinci Code, which has become one of the best selling novels of all time as well as the subject of intellectual debate among readers and scholars. Brown’s novels are published in 52 languages around the world with 200 million copies in print.\n\nIn 2005, Brown was named one of the 100 Most Influential People in the World by TIME Magazine, whose editors credited him with “keeping the publishing industry afloat; renewed interest in Leonardo da Vinci and early Christian history; spiking tourism to Paris and Rome; a growing membership in secret societies; the ire of Cardinals in Rome; eight books denying the claims of the novel and seven guides to read along with it; a flood of historical thrillers; and a major motion picture franchise.”\n\nThe son of a mathematics teacher and a church organist, Brown was raised on a prep school campus where he developed a fascination with the paradoxical interplay between science and religion. These themes eventually formed the backdrop for his books. He is a graduate of Amherst College and Phillips Exeter Academy, where he later returned to teach English before focusing his attention full time to writing.\n\nBrown is currently at work on a new book as well as the Columbia Pictures film version of his most recent novel.",
            photo: "https://images.gr-assets.com/authors/1399396714p8/630.jpg"
        }
    ],
    ratingValue: 0
},
{
    id: "5ef824206c96d53e7d60608c",
    createAt: "0001-01-01T00:00:00Z",
    releaseAt: "2006-01-01T00:00:00Z",
    title: "Bộ Bộ Kinh Tâm",
    genreIds: [
        "5ee636f4667dda1439c29a9d",
        "5ee636a9667dda1439c29a96"
    ],
    authorIds: [
        "5ef81ec26c96d53e7d60608b"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FB%E1%BB%99-B%E1%BB%99-Kinh-T%C3%A2m.jpg?alt=media&token=59fd7aca-6422-4be1-8109-5580a1a1bbb1",
    sypnosis: "Truyện Bộ Bộ Kinh Tâm của tác giả Đồng Hoa là truyện xuyên không, ngôn tình cổ đại không xa lạ với bạn dọc khi nó đã được chuyển thể thành những bộ phim nổi tiếng về thời nhà Thanh.  Trên lối lên đình ngoạn cảnh hồ, có hai cô bé luống mười ba mười bốn tuổi đứng đối mặt nhau. Cô bé vận áo dài màu hoàng yến đã vãn cảnh xong, đang định đi xuống, cô bé áo lam nhạt thì sắp sửa đi lên.  Thang lên đình tương đối hẹp, một người đi thoải mái, nhưng hai người cùng đi thì không thể vừa. Đôi bên đều không muốn nhường đường, cả hai cùng nhấc chân, cất bước, hích nhau mà qua.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2Fbo_bo_kinh_tam__dong_hoa.epub?alt=media&token=22f97bbe-5f94-4c96-83bb-95bc790b5737",
    genres: [
        {
            id: "5ee636f4667dda1439c29a9d",
            name: "Drama"
        },
        {
            id: "5ee636a9667dda1439c29a96",
            name: "Romance"
        }
    ],
    authors: [
        {
            id: "5ef81ec26c96d53e7d60608b",
            name: "Đồng Hoa",
            about: "Người Trung Quốc, là tác giả tiểu thuyết lãng mạn, cô còn sử dụng bút danh Trương Tiểu Tam (张小三). Tốt nghiệp Đại học Bắc Kinh. Năm 2005, để mở rộng sang Hoa Kỳ, cô cho đăng tải tiểu thuyết Bộ bộ kinh tâm lên mạng, năm 2006 thì xuất bản chính thức.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2Fbc9u.jpg?alt=media&token=3de131d5-eaa4-473d-8774-c85ee65d236a"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09ef5f7d93dfde66687753",
    createAt: "2020-07-11T16:57:03.625Z",
    releaseAt: "2006-05-23T00:00:00Z",
    title: "To Kill a Mockingbird",
    genreIds: [
        "5f09ee9d7d93dfde66687752",
        "5ee636a1667dda1439c29a95",
        "5ee63696667dda1439c29a94"
    ],
    authorIds: [
        "5f09edfc7d93dfde66687751"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FToKillaMockingbird?alt=media&token=578be072-30a6-41fb-9c2d-e7c46a5fc8a3",
    sypnosis: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FToKillaMockingbird.epub?alt=media&token=013fa7d3-9890-49ef-872e-cac9b4d471fe",
    genres: [
        {
            id: "5f09ee9d7d93dfde66687752",
            name: "Historical"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        }
    ],
    authors: [
        {
            id: "5f09edfc7d93dfde66687751",
            name: "Harper Lee",
            about: "Harper Lee, known as Nelle, was born in the Alabama town of Monroeville, the youngest of four children of Amasa Coleman Lee and Frances Cunningham Finch Lee. Her father, a former newspaper editor and proprietor, was a lawyer who served on the state legislature from 1926 to 1938. As a child, Lee was a tomboy and a precocious reader, and enjoyed the friendship of her schoolmate and neighbor, the young Truman Capote.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FHarperLee?alt=media&token=a22f6432-a3e7-44e4-a534-64138c26e2aa"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f25b7d93dfde66687755",
    createAt: "2020-07-11T17:09:47.236Z",
    releaseAt: "1925-04-09T00:00:00Z",
    title: "The Great Gatsby",
    genreIds: [
        "5ee636a9667dda1439c29a96",
        "5f09ee9d7d93dfde66687752",
        "5ee63714667dda1439c29aa1",
        "5ee636a1667dda1439c29a95",
        "5ee63696667dda1439c29a94"
    ],
    authorIds: [
        "5f09f12e7d93dfde66687754"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FTheGreatGatsby.jpg?alt=media&token=3acd1edf-9ff4-4683-8d85-d4e45bddfa1c",
    sypnosis: "Here is a novel, glamorous, ironical, compassionate – a marvelous fusion into unity of the curious incongruities of the life of the period – which reveals a hero like no other – one who could live at no other time and in no other place. But he will live as a character, we surmise, as long as the memory of any reader lasts.  It is the story of this Jay Gatsby who came so mysteriously to West Egg, of his sumptuous entertainments, and of his love for Daisy Buchanan – a story that ranges from pure lyrical beauty to sheer brutal realism, and is infused with a sense of the strangeness of human circumstance in a heedless universe.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FTheGreatGatsby.epub?alt=media&token=d8be5254-e0da-46ec-a1cc-10f52795b2f0",
    genres: [
        {
            id: "5ee636a9667dda1439c29a96",
            name: "Romance"
        },
        {
            id: "5f09ee9d7d93dfde66687752",
            name: "Historical"
        },
        {
            id: "5ee63714667dda1439c29aa1",
            name: "Literature"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        }
    ],
    authors: [
        {
            id: "5f09f12e7d93dfde66687754",
            name: "F. Scott Fitzgerald",
            about: "Francis Scott Key Fitzgerald was an American writer of novels and short stories, whose works have been seen as evocative of the Jazz Age, a term he himself allegedly coined. He is regarded as one of the greatest twentieth century writers. Fitzgerald was of the self-styled \"Lost Generation,\" Americans born in the 1890s who came of age during World War I. He finished four novels, left a fifth unfinished, and wrote dozens of short stories that treat themes of youth, despair, and age. He was married to Zelda Fitzgerald.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FF.ScottFitzgerald.jpg?alt=media&token=7bc90f3b-ba4b-4325-9792-8f8039edd0b3"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f3f97d93dfde66687757",
    createAt: "2020-07-11T17:16:41.613Z",
    releaseAt: "1945-08-17T00:00:00Z",
    title: "Animal Farm",
    genreIds: [
        "5ee63714667dda1439c29aa1",
        "5ee636d0667dda1439c29a99",
        "5ee636a1667dda1439c29a95",
        "5ee636c9667dda1439c29a98",
        "5ee6372b667dda1439c29aa3",
        "5ee63735667dda1439c29aa4",
        "5ee63696667dda1439c29a94"
    ],
    authorIds: [
        "5f09f2b17d93dfde66687756"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FAnimalFarm.jpg?alt=media&token=68e9133e-d698-4856-93a2-daf8fc611031",
    sypnosis: "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FAnimalFarm.epub?alt=media&token=c308ab65-52d1-49fc-afbf-96be53367684",
    genres: [
        {
            id: "5ee63714667dda1439c29aa1",
            name: "Literature"
        },
        {
            id: "5ee636d0667dda1439c29a99",
            name: "Fantasy"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        },
        {
            id: "5ee636c9667dda1439c29a98",
            name: "Science Fiction"
        },
        {
            id: "5ee6372b667dda1439c29aa3",
            name: "Politics"
        },
        {
            id: "5ee63735667dda1439c29aa4",
            name: "Dystopia"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        }
    ],
    authors: [
        {
            id: "5f09f2b17d93dfde66687756",
            name: "George Orwell",
            about: "Eric Arthur Blair, better known by his pen name George Orwell, was an English author and journalist. His work is marked by keen intelligence and wit, a profound awareness of social injustice, an intense opposition to totalitarianism, a passion for clarity in language, and a belief in democratic socialism.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FGeorgeOrwell.jpg?alt=media&token=2728217c-10ba-4efa-91b4-8a10c805bc4d"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f4d47d93dfde66687758",
    createAt: "2020-07-11T17:20:20.535Z",
    releaseAt: "1949-06-07T00:00:00Z",
    title: "1984",
    genreIds: [
        "5ee63696667dda1439c29a94",
        "5ee636a1667dda1439c29a95",
        "5ee636c9667dda1439c29a98",
        "5ee63735667dda1439c29aa4"
    ],
    authorIds: [
        "5f09f2b17d93dfde66687756"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2F1984.jpg?alt=media&token=d0146333-c631-4760-9d0a-6d1737854c6d",
    sypnosis: "The new novel by George Orwell is the major work towards which all his previous writing has pointed. Critics have hailed it as his \"most solid, most brilliant\" work. Though the story of Nineteen Eighty-Four takes place thirty-five years hence, it is in every sense timely. the scene is London, where there has been no new housing since 1950 and where the city-wide slums are called victory Mansions. Science has abandoned Man for the State. As every citizen knows only too well, war is peace.  To Winston Smith, a young man who works in the Ministry of Truth (Minitru for short), come two people who transform this life completely. One is Julia, whom he meets after she hands him a slip reading, \"I love you.\" The other is O'Brien, who tells him, \"We shall meet in the place where there is no darkness.\" The way in which Winston is betrayed by the one and, against his own desires and instincts, ultimately betrays the other, makes a story of mounting drama and suspense.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FNineteenEighty-Four.epub?alt=media&token=edcb1fdd-ca34-4bf2-910b-936e95fcded9",
    genres: [
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        },
        {
            id: "5ee636c9667dda1439c29a98",
            name: "Science Fiction"
        },
        {
            id: "5ee63735667dda1439c29aa4",
            name: "Dystopia"
        }
    ],
    authors: [
        {
            id: "5f09f2b17d93dfde66687756",
            name: "George Orwell",
            about: "Eric Arthur Blair, better known by his pen name George Orwell, was an English author and journalist. His work is marked by keen intelligence and wit, a profound awareness of social injustice, an intense opposition to totalitarianism, a passion for clarity in language, and a belief in democratic socialism.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FGeorgeOrwell.jpg?alt=media&token=2728217c-10ba-4efa-91b4-8a10c805bc4d"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f6277d93dfde6668775a",
    createAt: "2020-07-11T17:25:59.136Z",
    releaseAt: "1951-07-15T00:00:00Z",
    title: "The Catcher in the Rye",
    genreIds: [
        "5ee63714667dda1439c29aa1",
        "5ee63696667dda1439c29a94",
        "5ee636a1667dda1439c29a95"
    ],
    authorIds: [
        "5f09f5607d93dfde66687759"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FTheCatcherintheRye.jpg?alt=media&token=b40b9ec8-32bf-436c-860a-c19f212d5432",
    sypnosis: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days. The boy himself is at once too simple and too complex for us to make any final comment about him or his story. Perhaps the safest thing we can say about Holden is that he was born in the world not just strongly attracted to beauty but, almost, hopelessly impaled on it. There are many voices in this novel: children's voices, adult voices, underground voices-but Holden's voice is the most eloquent of all. Transcending his own vernacular, yet remaining marvelously faithful to it, he issues a perfectly articulated cry of mixed pain and pleasure. However, like most lovers and clowns and poets of the higher orders, he keeps most of the pain to, and for, himself. The pleasure he gives away, or sets aside, with all his heart. It is there for the reader who can handle it to keep.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FTheCatcherintheRye.epub?alt=media&token=14a77203-c6ea-41ed-982a-9b73edb0f85c",
    genres: [
        {
            id: "5ee63714667dda1439c29aa1",
            name: "Literature"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        }
    ],
    authors: [
        {
            id: "5f09f5607d93dfde66687759",
            name: "J.D. Salinger",
            about: "Jerome David Salinger was an American author, best known for his 1951 novel The Catcher in the Rye, as well as his reclusive nature. His last original published work was in 1965; he gave his last interview in 1980. Raised in Manhattan, Salinger began writing short stories while in secondary school, and published several stories in the early 1940s before serving in World War II. In 1948 he published the critically acclaimed story \"A Perfect Day for Bananafish\" in The New Yorker magazine, which became home to much of his subsequent work. In 1951 Salinger released his novel The Catcher in the Rye, an immediate popular success. His depiction of adolescent alienation and loss of innocence in the protagonist Holden Caulfield was influential, especially among adolescent readers. The novel remains widely read and controversial, selling around 250,000 copies a year.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FJ.D.Salinger.jpg?alt=media&token=6c731a57-b1c8-4141-a9a3-7f2c6d91d0e8"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f9507d93dfde66687762",
    createAt: "2020-07-11T17:39:28.617Z",
    releaseAt: "1954-09-16T00:00:00Z",
    title: "Lord of the Flies",
    genreIds: [
        "5f09f7f67d93dfde66687761",
        "5ee63696667dda1439c29a94",
        "5ee636a1667dda1439c29a95"
    ],
    authorIds: [
        "5f09f71b7d93dfde6668775c"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FLordoftheFlies.jpg?alt=media&token=b48f5219-f181-4853-a65a-e7f075601790",
    sypnosis: "At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate; this far from civilization the boys can do anything they want. Anything. They attempt to forge their own society, failing, however, in the face of terror, sin and evil. And as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far from reality as the hope of being rescued. Labeled a parable, an allegory, a myth, a morality tale, a parody, a political treatise, even a vision of the apocalypse, Lord of the Flies is perhaps our most memorable novel about “the end of innocence, the darkness of man’s heart.”",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FLordoftheFlies.epub?alt=media&token=d8d34c80-1642-438b-8da6-fe216fef117a",
    genres: [
        {
            id: "5f09f7f67d93dfde66687761",
            name: "Young Adult"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        }
    ],
    authors: [
        {
            id: "5f09f71b7d93dfde6668775c",
            name: "William Golding",
            about: "Sir William Gerald Golding was a British novelist, poet, and playwright best known for his 1954 novel Lord of the Flies. Golding spent two years in Oxford focusing on sciences; however, he changed his educational emphasis to English literature, especially Anglo-Saxon.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FWilliamGolding.jpg?alt=media&token=4dc923ae-3bb0-4743-978f-f536d6225992"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09f9b07d93dfde66687763",
    createAt: "2020-07-11T17:41:04.551Z",
    releaseAt: "1955-01-01T00:00:00Z",
    title: "Lolita",
    genreIds: [
        "5ee63714667dda1439c29aa1",
        "5ee63696667dda1439c29a94",
        "5ee636a1667dda1439c29a95"
    ],
    authorIds: [
        "5f09f7437d93dfde6668775d"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FLolita.jpg?alt=media&token=21079eec-79d1-4999-ab65-0712979d8453",
    sypnosis: "Humbert Humbert - scholar, aesthete and romantic - has fallen completely and utterly in love with Lolita Haze, his landlady's gum-snapping, silky skinned twelve-year-old daughter. Reluctantly agreeing to marry Mrs Haze just to be close to Lolita, Humbert suffers greatly in the pursuit of romance; but when Lo herself starts looking for attention elsewhere, he will carry her off on a desperate cross-country misadventure, all in the name of Love. Hilarious, flamboyant, heart-breaking and full of ingenious word play, Lolita is an immaculate, unforgettable masterpiece of obsession, delusion and lust.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FLolita.epub?alt=media&token=c3350768-4094-4699-ac0c-e378b3ee982e",
    genres: [
        {
            id: "5ee63714667dda1439c29aa1",
            name: "Literature"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        }
    ],
    authors: [
        {
            id: "5f09f7437d93dfde6668775d",
            name: "Vladimir Nabokov",
            about: "Vladimir Vladimirovich Nabokov, also known by the pen name Vladimir Sirin, was a Russian-American novelist. Nabokov wrote his first nine novels in Russian, then rose to international prominence as a master English prose stylist. He also made significant contributions to lepidoptery, and had a big interest in chess problems.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FVladimirNabokov.jpg?alt=media&token=56fbf0e0-af90-449d-bbbb-1def0db27319"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09fa687d93dfde66687764",
    createAt: "2020-07-11T17:44:08.02Z",
    releaseAt: "1998-07-02T00:00:00Z",
    title: "Harry Potter and the Chamber of Gas",
    genreIds: [
        "5f09f7f67d93dfde66687761",
        "5f09f7dd7d93dfde66687760",
        "5ee636fd667dda1439c29a9e",
        "5ee63696667dda1439c29a94",
        "5ee636d0667dda1439c29a99"
    ],
    authorIds: [
        "5f09f7847d93dfde6668775e"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FHarryPotterandtheChamberofGas.jpg?alt=media&token=aceebd52-9099-4d5d-9e55-4368ce631e99",
    sypnosis: "Ever since Harry Potter had come home for the summer, the Dursleys had been so mean and hideous that all Harry wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he’s packing his bags, Harry receives a warning from a strange impish creature who says that if Harry returns to Hogwarts, disaster will strike.  And strike it does. For in Harry’s second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor and a spirit who haunts the girls’ bathroom. But then the real trouble begins – someone is turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possible be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects… Harry Potter himself!",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FHarryPotterandtheChamberofGas.epub?alt=media&token=4d1e4455-97dc-471a-917a-bd371ec37a5d",
    genres: [
        {
            id: "5f09f7f67d93dfde66687761",
            name: "Young Adult"
        },
        {
            id: "5f09f7dd7d93dfde66687760",
            name: "Adventure"
        },
        {
            id: "5ee636fd667dda1439c29a9e",
            name: "Childrens"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636d0667dda1439c29a99",
            name: "Fantasy"
        }
    ],
    authors: [
        {
            id: "5f09f7847d93dfde6668775e",
            name: "J.K. Rowling",
            about: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling. She calls herself Jo and has said, \"No one ever called me 'Joanne' when I was young, unless they were angry.\" Following her marriage, she has sometimes used the name Joanne Murray when conducting personal business. During the Leveson Inquiry she gave evidence under the name of Joanne Kathleen Rowling. In a 2012 interview, Rowling noted that she no longer cared that people pronounced her name incorrectly.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FJ.K.Rowling.jpg?alt=media&token=15c50f2c-c5d5-48a2-bf5d-669115037329"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09fac57d93dfde66687765",
    createAt: "2020-07-11T17:45:41.029Z",
    releaseAt: "1952-09-01T00:00:00Z",
    title: "The Old Man and the Sea",
    genreIds: [
        "5ee63696667dda1439c29a94",
        "5ee63714667dda1439c29aa1",
        "5ee636a1667dda1439c29a95"
    ],
    authorIds: [
        "5f09f7ba7d93dfde6668775f"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FTheOldManandtheSea.jpg?alt=media&token=10927e32-88da-4456-a5dd-c80367808130",
    sypnosis: "This short novel, already a modern classic, is the superbly told, tragic story of a Cuban fisherman in the Gulf Stream and the giant Marlin he kills and loses — specifically referred to in the citation accompanying the author's Nobel Prize for literature in 1954.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FTheOldManandtheSea.epub?alt=media&token=5a2ca92a-85a1-4ca7-abc6-1a3f9920b99e",
    genres: [
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee63714667dda1439c29aa1",
            name: "Literature"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        }
    ],
    authors: [
        {
            id: "5f09f7ba7d93dfde6668775f",
            name: "Ernest Hemingway",
            about: "Ernest Miller Hemingway was an American author and journalist. His economical and understated style had a strong influence on 20th-century fiction, while his life of adventure and his public image influenced later generations. Hemingway produced most of his work between the mid-1920s and the mid-1950s, and won the Nobel Prize in Literature in 1954. He published seven novels, six short story collections and two non-fiction works. Three novels, four collections of short stories and three non-fiction works were published posthumously. Many of these are considered classics of American literature.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FErnestHemingway.jpg?alt=media&token=72fbf9e1-e7c6-4e95-9e6c-073b3e59afe0"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09fb2b7d93dfde66687766",
    createAt: "2020-07-11T17:47:23.444Z",
    releaseAt: "1997-06-26T00:00:00Z",
    title: "Harry Potter and the Sorcerer's Stone",
    genreIds: [
        "5f09f7f67d93dfde66687761",
        "5f09f7dd7d93dfde66687760",
        "5ee636a1667dda1439c29a95",
        "5ee63696667dda1439c29a94",
        "5ee636fd667dda1439c29a9e",
        "5ee636d0667dda1439c29a99"
    ],
    authorIds: [
        "5f09f7847d93dfde6668775e"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FHarryPotterandtheSorcerer'sStone.jpg?alt=media&token=3a27d18f-0794-4a86-a04d-6b0fe2e689d2",
    sypnosis: "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry.  After a lifetime of bottling up his magical powers, Harry finally feels like a normal kid. But even within the Wizarding community, he is special. He is the boy who lived: the only person to have ever survived a killing curse inflicted by the evil Lord Voldemort, who launched a brutal takeover of the Wizarding world, only to vanish after failing to kill Harry.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FHarryPotterandtheSorcerer'sStone.epub?alt=media&token=69b20c67-d62a-48d8-9ae0-e69331461949",
    genres: [
        {
            id: "5f09f7f67d93dfde66687761",
            name: "Young Adult"
        },
        {
            id: "5f09f7dd7d93dfde66687760",
            name: "Adventure"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636fd667dda1439c29a9e",
            name: "Childrens"
        },
        {
            id: "5ee636d0667dda1439c29a99",
            name: "Fantasy"
        }
    ],
    authors: [
        {
            id: "5f09f7847d93dfde6668775e",
            name: "J.K. Rowling",
            about: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling. She calls herself Jo and has said, \"No one ever called me 'Joanne' when I was young, unless they were angry.\" Following her marriage, she has sometimes used the name Joanne Murray when conducting personal business. During the Leveson Inquiry she gave evidence under the name of Joanne Kathleen Rowling. In a 2012 interview, Rowling noted that she no longer cared that people pronounced her name incorrectly.",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FJ.K.Rowling.jpg?alt=media&token=15c50f2c-c5d5-48a2-bf5d-669115037329"
        }
    ],
    ratingValue: 0
},
{
    id: "5f09fb967d93dfde66687767",
    createAt: "2020-07-11T17:49:10.512Z",
    releaseAt: "1943-04-06T00:00:00Z",
    title: "The Little Prince",
    genreIds: [
        "5ee636fd667dda1439c29a9e",
        "5ee63696667dda1439c29a94",
        "5ee636d0667dda1439c29a99",
        "5ee636a1667dda1439c29a95"
    ],
    authorIds: [
        "5f09f6ae7d93dfde6668775b"
    ],
    cover: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookImages%2FTheLittlePrince.jpg?alt=media&token=cc3b1e47-ef81-4892-875e-d163381476c0",
    sypnosis: "Moral allegory and spiritual autobiography, The Little Prince is the most translated book in the French language. With a timeless charm it tells the story of a little boy who leaves the safety of his own tiny planet to travel the universe, learning the vagaries of adult behaviour through a series of extraordinary encounters. His personal odyssey culminates in a voyage to Earth and further adventures.",
    downloadLink: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/BookFiles%2FTheLittlePrince.epub?alt=media&token=588352f9-0a4a-4328-b6f6-37504c0d540f",
    genres: [
        {
            id: "5ee636fd667dda1439c29a9e",
            name: "Childrens"
        },
        {
            id: "5ee63696667dda1439c29a94",
            name: "Fiction"
        },
        {
            id: "5ee636d0667dda1439c29a99",
            name: "Fantasy"
        },
        {
            id: "5ee636a1667dda1439c29a95",
            name: "Classics"
        }
    ],
    authors: [
        {
            id: "5f09f6ae7d93dfde6668775b",
            name: "Antoine de Saint-Exupéry",
            about: "Antoine de Saint-Exupéry was born in Lyons on June 29, 1900. He flew for the first time at the age of twelve, at the Ambérieu airfield, and it was then that he became determined to be a pilot. He kept that ambition even after moving to a school in Switzerland and while spending summer vacations at the family's château at Saint-Maurice-de-Rémens, in eastern France. (The house at Saint-Maurice appears again and again in Saint-Exupéry's writing.)",
            photo: "https://firebasestorage.googleapis.com/v0/b/uit-lib.appspot.com/o/AuthorPhotos%2FAntoinedeSaint-Exup%C3%A9ry.jpg?alt=media&token=016da7bf-9936-4767-b98c-4d8d29efb72a"
        }
    ],
    ratingValue: 0
}
];

export const getLocalBooks = () => {
  let localBooks: LocalBook[] = [];
  for (let book of mockBooks) {
    localBooks.push({
      book,
      bookFilePath: `C:\\Users\\tligsp\\Documents\\Minerva Reader\\books\\test\\abc.epub`,
      readingProgress: 0.5,
      readingTime: 5,
      dateAdded: Date.now.toString(),
      lastRead: Date.now.toString(),
    })
  }
  return localBooks;
}
