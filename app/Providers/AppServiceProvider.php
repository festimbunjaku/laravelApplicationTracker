<?php

namespace App\Providers;

use App\Models\JobApplication;
use App\Policies\JobApplicationPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // Register policies
        Gate::policy(JobApplication::class, JobApplicationPolicy::class);

        // Register route model binding
        Route::model('jobapplication', JobApplication::class);
    }
}
