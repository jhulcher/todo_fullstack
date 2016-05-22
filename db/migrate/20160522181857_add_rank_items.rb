class AddRankItems < ActiveRecord::Migration

  def self.up
    add_column :items, :rank, :integer, default: 0, null: true
    add_column :items, :finished, :boolean, default: false, null: true
  end

end
