class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :priority
      t.datetime :start_date
      t.datetime :end_date
      t.integer :status
      t.integer :position
      t.integer :user_id
      t.integer :task_id

      t.timestamps
    end
  end
end
