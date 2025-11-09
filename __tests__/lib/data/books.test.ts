import { getAllBooks, getBookById, getBooksByCategory } from '@/app/lib/data/books';

describe('Book Data Access Functions', () => {
  it('getAllBooks returns all books', () => {
    const books = getAllBooks();
    expect(books.length).toBeGreaterThan(0);
    expect(books[0]).toHaveProperty('id');
    expect(books[0]).toHaveProperty('title');
    expect(books[0]).toHaveProperty('author');
    expect(books[0]).toHaveProperty('price');
  });

  it('getBookById returns correct book', () => {
    const book = getBookById('book-001');
    expect(book).not.toBeNull();
    expect(book?.id).toBe('book-001');
    expect(book?.title).toBe('The Collected Poems of Rumi');
  });

  it('getBookById returns null for non-existent book', () => {
    const book = getBookById('non-existent');
    expect(book).toBeNull();
  });

  it('getBooksByCategory returns books for specific category', () => {
    const poetryBooks = getBooksByCategory('poetry');
    expect(poetryBooks.length).toBeGreaterThan(0);
    poetryBooks.forEach((book) => {
      expect(book.category).toBe('poetry');
    });
  });

  it('getBooksByCategory returns empty array for non-existent category', () => {
    const books = getBooksByCategory('non-existent');
    expect(books).toEqual([]);
  });
});

