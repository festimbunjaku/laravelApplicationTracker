<?php

namespace App\Http\Controllers;

use App\Actions\JobApplication\CreateJobApplication;
use App\Actions\JobApplication\DeleteJobApplication;
use App\Actions\JobApplication\ListJobApplications;
use App\Actions\JobApplication\UpdateJobApplication;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\JobApplication;
use Illuminate\Http\JsonResponse;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListJobApplications $listJobApplication): JsonResponse
    {
        // Manual authorization: user can view their own applications
        $this->authorize('viewAny', JobApplication::class);

        $applications = $listJobApplication->handle();

        return response()->json([
            'status' => 'success',
            'message' => 'Job applications retrieved successfully',
            'data' => JobApplicationResource::collection($applications),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobApplicationRequest $request, CreateJobApplication $createJobApplication): JsonResponse
    {
        $this->authorize('create', JobApplication::class);

        $application = $createJobApplication->handle(array_merge(
            $request->validated(),
            ['user_id' => \Illuminate\Support\Facades\Auth::id()]
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'Job application created successfully',
            'data' => new JobApplicationResource($application),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication): JsonResponse
    {
        $this->authorize('view', $jobApplication);

        return response()->json([
            'status' => 'success',
            'message' => 'Job application retrieved successfully',
            'data' => new JobApplicationResource($jobApplication),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobApplicationRequest $request, JobApplication $jobApplication, UpdateJobApplication $updateJobApplication): JsonResponse
    {
        $this->authorize('update', $jobApplication);

        $updated = $updateJobApplication->handle($jobApplication, $request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Job application updated successfully',
            'data' => new JobApplicationResource($updated),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplication $jobApplication, DeleteJobApplication $deleteJobApplication): JsonResponse
    {
        $this->authorize('delete', $jobApplication);

        $deleted = $deleteJobApplication->handle($jobApplication);

        if (! $deleted) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete job application',
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Job application deleted successfully',
         'data' => null,
        ], 200);
    }
}
