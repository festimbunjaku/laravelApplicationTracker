<?php

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\User;

class JobApplicationPolicy
{
    /**
     * Determine whether the user can view any job applications.
     */
    public function viewAny(User $user): bool
    {
        // Allow all users to view their own list
        // Admin check can be added if you have roles
        return true;
    }

    /**
     * Determine whether the user can view the job application.
     */
    public function view(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }

    /**
     * Determine whether the user can create a job application.
     */
    public function create(User $user): bool
    {
        // Every authenticated user can create their own job application
        return true;
    }

    /**
     * Determine whether the user can update the job application.
     */
    public function update(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }

    /**
     * Determine whether the user can delete the job application.
     */
    public function delete(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }
}
