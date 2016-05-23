class Api::ItemsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id

    if current_user.items.count > 0
      @item.rank = current_user.items.where(finished: false).count + 1
    else
      @item.rank = 0
    end

    @item.save!
    # return new set of items
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def update
    @item = Item.find(params[:id])

    if params[:item][:rank]
      @item.rank = params[:item][:rank]
      @item.save!
      return @items = current_user.items.where(finished: false).sort_by { |x| x.rank }

    end

    if params[:item][:finished]
      @item.finished = params[:item][:finished]
    end

    @item.save!
    #return new set of items
    if @item.finished
      @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
    else
      @item.rank = current_user.items.count + 1
      @item.save!
      @items = current_user.items.where(finished: true)
      @items = @items.sort_by { |x| x.updated_at }.reverse
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
    # return new set of items
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  private
  def item_params
    params.require(:item).permit(:item_body, :rank, :finished)
  end
end
