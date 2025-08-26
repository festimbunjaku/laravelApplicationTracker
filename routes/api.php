<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Protected user route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::put('/user', [UserController::class, 'update'])
    ->middleware('auth:sanctum');
