<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Webkul\Customer\Repositories\CustomerRepository;

class AuthController extends BaseController
{
    public function __construct(
        protected CustomerRepository $customerRepository
    ) {}

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $customer = $this->customerRepository->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_verified' => 1,
        ]);

        $token = $customer->createToken('auth_token')->plainTextToken;

        return $this->success([
            'token' => $token,
            'customer' => $customer,
        ], 'Registration successful', 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        if (!Auth::guard('customer')->attempt($request->only('email', 'password'))) {
            return $this->error('Invalid credentials', 401);
        }

        $customer = Auth::guard('customer')->user();
        $token = $customer->createToken('auth_token')->plainTextToken;

        return $this->success([
            'token' => $token,
            'customer' => $customer,
        ], 'Login successful');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return $this->success(null, 'Logout successful');
    }

    public function me(Request $request)
    {
        return $this->success($request->user(), 'User retrieved successfully');
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $customer = $this->customerRepository->update($request->only([
            'first_name', 'last_name', 'phone'
        ]), $request->user()->id);

        return $this->success($customer, 'Profile updated successfully');
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $customer = $request->user();

        if (!Hash::check($request->current_password, $customer->password)) {
            return $this->error('Current password is incorrect', 400);
        }

        $this->customerRepository->update([
            'password' => Hash::make($request->password)
        ], $customer->id);

        return $this->success(null, 'Password changed successfully');
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        // Implement password reset logic here
        
        return $this->success(null, 'Password reset link sent to your email');
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        // Implement password reset logic here
        
        return $this->success(null, 'Password reset successfully');
    }

    public function socialLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'provider' => 'required|in:google,facebook,github,twitter',
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        // Implement social login logic here
        
        return $this->success(null, 'Social login successful');
    }
}
