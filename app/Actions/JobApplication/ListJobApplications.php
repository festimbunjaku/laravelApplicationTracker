<?php

namespace App\Actions\JobApplication;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Auth;

class ListJobApplications
{
    public function handle()
    {
        return JobApplication::where('user_id', Auth::id())->latest()->get();
    }
}
