<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure we have at least 10 users
        if (User::count() < 10) {
            User::factory(10)->create();
        }

        // Create 10 job applications assigned to random users
        JobApplication::factory(50)->create();
    }
}
