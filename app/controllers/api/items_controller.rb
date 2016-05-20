class Api::ItemsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @items = Item.all
  end

  # def show
  #   @item = Item.find(params[:id])
  # end

  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id
    @item.save!
    # render json: {}
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
    render json: {}
  end

  private
  def item_params
    params.require(:item).permit(:item_body)
  end
end
