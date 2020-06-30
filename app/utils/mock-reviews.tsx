import { Review } from '../types';
import * as MockBooks from './mock-books';
import * as MockUsers from './mock-users';

export let mockReviews: Review[] = [
  {
    id: 'book02review00',
    ratingValue: 4,
    user: MockUsers.thangL,
    book: MockBooks.mockBooks[1],
    content: `Deception Point, Dan Brown
        Deception Point is a 2001 thriller novel written by Dan Brown.
        A NASA satellite finds evidence of a rare object buried deep in the Arctic ice, NASA proclaims a much-needed victory that has profound implications for U.S. space policy and the upcoming presidential election. With the White House in the balance, the President dispatches White House Intelligence analyst Rachel Sexton and a team of experts to the Milne Ice Shelf to confirm the authenticity of the find.`
  },
  {
    id: 'book02review01',
    ratingValue: 3.5,
    user: MockUsers.thangNg,
    book: MockBooks.mockBooks[1],
    content: `In this work, Dan Brown made the book more interesting because he kept a light on a different direction. Our world is already ruled in the shadow of political games. The realities know they can only read between the lines.`
  },
];
