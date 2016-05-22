class Api::UsersController < ApplicationController
  before_filter :require_signed_in!

  def show
    @user = User.find(params[:id])

    @items = @user.items.where(finished: true)
    @items = @items.sort_by { |x| x.updated_at }.reverse
  end

  def index
    @users = User.all
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
