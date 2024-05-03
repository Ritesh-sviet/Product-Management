<?php

use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Models\ProductCategory;
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



Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::post('login', [UserAuthController::class, 'store']);
    Route::post('logout', [UserAuthController::class, 'destroy'])->middleware('auth:api');
    Route::get('hash', [UserAuthController::class, 'hash']);
});
Route::group(['namespace' => 'Controllers', 'prefix' => 'v1'], function () {
    Route::get("/parent", [UserController::class, "index"]);
    Route::get("/categories", [ProductCategoryController::class, "index"]);
    Route::get("/products", [ProductController::class, "index"]);
    Route::get("/all_staff", [UserController::class, "staff"]);
    Route::post("/add_staff", [UserController::class, "store"])->middleware('auth:api');
    Route::post("/add_product_category", [ProductCategoryController::class, "store"])->middleware('auth:api');
    Route::post("/add_supplier", [SupplierController::class, "store"])->middleware('auth:api');
    Route::post("/add_product", [ProductController::class, "store"])->middleware('auth:api');
    Route::get("/supplier", [SupplierController::class, "index"]);
    // Route::post("/staff", [UserController::class, "store"])->middleware('auth:api');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
