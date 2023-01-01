import fs from "fs";
import path from "path";

// Lay duong dan toi thu muc BOOKS
const booksDir = path.join(process.cwd(), "books");

export const getBooks = () => {
  // Danh sach cac ten file
  const bookFileNames = fs.readdirSync(booksDir);
  const booksData = bookFileNames.map((bookFileName) => {
    // Duong dan toi tung thu file trong folder BOOKS
    const fullBookPath = path.join(booksDir, bookFileName);
    const bookContent = fs.readFileSync(fullBookPath, "utf8");

    return {
      bookName: bookFileName.replace(/\.txt$/, ""),
      bookContent,
    };
  });

  return booksData;
};
