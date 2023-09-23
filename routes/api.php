<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [UserController::class, "register"]);
Route::post('login', [UserController::class, "login"]);
Route::post('create-book', [BookController::class, "store"]);
Route::post('create-category', [CategoryController::class, "store"]);
Route::match(['get', 'post', "head"], 'books', [BookController::class, "index"]);
Route::get('book/{id}', [BookController::class, "show"]);
Route::get('category/{id}', [BookController::class, "related"]);
Route::get('categories', [CategoryController::class, "index"]);
Route::post('demande', [RequestController::class, "store"]);
Route::post('done/{id}', [RequestController::class, "request_done"]);
Route::get('demandes', [RequestController::class, "index"]);
