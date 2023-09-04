class AuthenticationController < ApplicationController
	skip_before_action :authenticate_user
	def login
		@user = User.find_by_user_name(params[:user_name])
		if @user&.authenticate(params[:password])
			access_token = JwtToken.encode({user_id: @user.id})
      		render json: {access_token: access_token, first_name: @user.first_name, last_name: @user.last_name, gender: @user.gender, dob: @user.dob}, status: :ok
		else
			render json: {error: 'unauthorized'}, status: :unauthorized
		end
	end
end
