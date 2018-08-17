class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :name
      t.text :description
      t.integer :section_position
      t.integer :status
      t.integer :board_id

      t.timestamps
    end
  end
end
