<?php

namespace App\Actions\JobApplication;

use App\Models\JobApplication;
use Exception;
use Illuminate\Support\Facades\Auth;

class CreateJobApplication
{
    /**
     * @throws Exception
     */
    public function handle(array $data): JobApplication
    {
        $userId = $data['user_id'] ?? Auth::id();
        if (! $userId) {
            throw new Exception('User must be authenticated to create a job application.');
        }

        $data['user_id'] = $userId;

        // Ensure all fillable fields are present
        return JobApplication::create($data);
    }
}
