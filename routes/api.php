<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\JobApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Protected user route
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::put('/user', [UserController::class, 'update']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::apiResource('jobapplications', JobApplicationController::class);
});

// Public API routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
