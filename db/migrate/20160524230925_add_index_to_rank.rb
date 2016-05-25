class AddIndexToRank < ActiveRecord::Migration
  def change
    add_index :items, :rank
  end
end
