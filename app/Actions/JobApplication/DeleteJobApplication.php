<?php

namespace App\Actions\JobApplication;

use App\Models\JobApplication;

class DeleteJobApplication
{
    public function handle(JobApplication $jobApplication): bool
    {
        return $jobApplication->delete();
    }
}
