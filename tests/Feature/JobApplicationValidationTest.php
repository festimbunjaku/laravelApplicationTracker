<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('fails validation when link is empty', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('/api/v1/job-applications', [
        'link' => '',
        'title' => 'Laracast',
        'position' => 'Laracast',
        'company' => 'Laravel',
        'status' => 'In Progress',
        'notes' => 'Hello thwe aplication sent',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['link']);
});

it('fails validation when link is not a valid URL', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('/api/v1/job-applications', [
        'link' => 'not-a-valid-url',
        'title' => 'Laracast',
        'position' => 'Laracast',
        'company' => 'Laravel',
        'status' => 'In Progress',
        'notes' => 'Hello thwe aplication sent',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['link']);
});

it('passes validation with valid data', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('/api/v1/job-applications', [
        'link' => 'https://example.com/job',
        'title' => 'Laracast',
        'position' => 'Laracast',
        'company' => 'Laravel',
        'status' => 'pending',
        'notes' => 'Hello thwe aplication sent',
    ]);

    $response->assertStatus(201);
});

it('fails validation with exact user JSON format', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('/api/v1/job-applications', [
        'link' => null,
        'title' => 'Laracast',
        'position' => 'Laracast',
        'company' => 'Laravel',
        'status' => 'In Progress',
        'notes' => 'Hello thwe aplication sent',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['link']);
});

it('fails validation when link field is missing entirely', function () {
    Sanctum::actingAs(User::factory()->create());

    $response = $this->postJson('/api/v1/job-applications', [
        'title' => 'Laracast',
        'position' => 'Laracast',
        'company' => 'Laravel',
        'status' => 'In Progress',
        'notes' => 'Hello thwe aplication sent',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['link']);
});
