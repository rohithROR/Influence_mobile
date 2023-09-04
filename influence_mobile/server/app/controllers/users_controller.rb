class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  skip_before_action :authenticate_user, only: :create


  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  def profile
    render json: @current_user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      access_token = JwtToken.encode({user_id: @user.id})
      render json: {access_token: access_token, first_name: @user.first_name, last_name: @user.last_name, gender: @user.gender, dob: @user.dob}, status: :ok
    else
      render json: {error: @user.errors.full_messages.join(', ')}, status: :ok
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:gender, :first_name, :last_name, :user_name, :password, :dob)
    end
end
