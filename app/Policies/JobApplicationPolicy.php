<?php

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\User;

class JobApplicationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobApplication $jobApplication): bool
    {
        return $user->id === $jobApplication->user_id;
    }
}
