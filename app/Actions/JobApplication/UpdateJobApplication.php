<?php

namespace App\Actions\JobApplication;

use App\Models\JobApplication;

class UpdateJobApplication
{
    public function handle(JobApplication $jobapplication, array $data): JobApplication
    {
        $jobapplication->update($data);

        return $jobapplication;
    }
}
