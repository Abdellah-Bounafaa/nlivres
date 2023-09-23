<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $arabic_books = Book::where('language', "Arabic")->latest()->get();
        $english_books = Book::where('language', "English")->latest()->get();
        $french_books = Book::where('language', "French")->latest()->get();
        $books = Book::paginate(12);
        return response()->json([
            'arabic_books' => $arabic_books,
            'english_books' => $english_books,
            'french_books' => $french_books,
            'books' => $books,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $book = new Book();
        $book->title = $request->title;
        $book->author = $request->author;
        $book->year = $request->year;
        $book->language = $request->language;
        $book->pages = $request->pages;
        $book->description = $request->description;
        $path = "books/files";
        $images_path = "books/images";
        if (!File::exists(public_path($path))) {
            File::makeDirectory(public_path($path), 0777, true);
        }
        if (!File::exists(public_path($images_path))) {
            File::makeDirectory(public_path($images_path), 0777, true);
        }
        $new_file_name = "FILE" . uniqid() . "." . $request->file('filename')->extension();
        $new_image_name = "UIMG" . uniqid() . "." . $request->file('image')->extension();
        $request->file("filename")->move(public_path($path), $new_file_name);
        $request->file("image")->move(public_path($images_path), $new_image_name);
        $book->filename = $new_file_name;
        $book->image = $new_image_name;
        $book->size = $request->size;
        $book->categorie_id = $request->categorie_id;
        $book->save();
        return $book;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::find($id);
        return $book;
    }

    public function related(string $id)
    {
        $books = Book::where('categorie_id', $id)->get();
        return $books;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}