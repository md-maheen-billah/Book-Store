import { Request, Response } from "express";
import { BookService } from "./book.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, price, category, description, quantity, inStock } =
      req.body;
    const result = await BookService.createBookIntoDB({
      title,
      author,
      price,
      category,
      description,
      quantity,
      inStock,
    });
    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Book could not be created",
      success: false,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await BookService.getBooksFromDB(searchTerm as string);
    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "Books could not be retrieved",
      success: false,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const getABook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId;
    const result = await BookService.getABookFromDB(bookId);

    if (!result) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "Book could not be retrieved",
      success: false,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId;
    const bookData = req.body;
    const result = await BookService.updateABookInDB(bookId, bookData);

    if (!result) {
      res.status(404).json({
        message: "Book to be updated not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Book updated successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Book was not updated",
      success: false,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId;

    const result = await BookService.getABookFromDB(bookId);

    if (!result) {
      res.status(404).json({
        message: "Book to be deleted not found",
        success: false,
      });
      return;
    }
    await BookService.deleteABookInDB(bookId);
    res.status(200).json({
      message: "Book deleted successfully",
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      message: "Book was not deleted",
      success: false,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

export const BookController = {
  createBook,
  getBooks,
  getABook,
  updateBook,
  deleteBook,
};
