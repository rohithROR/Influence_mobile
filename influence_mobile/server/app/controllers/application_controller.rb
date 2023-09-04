class ApplicationController < ActionController::API
	include JwtToken
	before_action :authenticate_user

	def current_user
		@current_user
	end

	private
	def authenticate_user
		header = request.headers['Authorization']
		header = header.split(' ').last if header
		begin
			@decode = JwtToken.decode(header)
			@current_user = User.find(@decode[:user_id])
		rescue ActiveRecordNotFound => e
			render json: {error: e.message}, status: :unauthorized
		rescue JWT::DecodeError => e
			render json: {error: e.message}, status: :unauthorized
		end
	end
end
