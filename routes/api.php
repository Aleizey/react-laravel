<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ver los productos 
Route::get('/products', [ProductController::class, 'index'])
    ->middleware('auth:sanctum');

// borrar los productos  
Route::delete('/products/{product}', [ProductController::class, 'destroy'])
    ->middleware('auth:sanctum');
