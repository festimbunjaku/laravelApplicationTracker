<?php

namespace Database\Factories;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = JobApplication::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(), // ensures a user exists
            'title' => $this->faker->sentence(3),
            'position' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'link' => $this->faker->url(),
        ];
    }
}
