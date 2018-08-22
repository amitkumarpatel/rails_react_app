class TasksController < ApplicationController
	def index
		@tasks = Task.includes(:section).where(section_id: params[:section_id]).order("id ASC").paginate(page: params[:page], per_page: 10)
		render json: @tasks
	end

	def create
		section = Section.find(params[:section_id])
	  task = section.tasks.new(params[:task])
	  if task.save
	    render json: task
	  else
	    render nothing: true, status: :bad_request
	  end
	end

	def update
		task = Task.find(params[:id])
    if task.update_attributes(params[:task])
      render json: task
    else
      render nothing: true, status: :unprocessable_entity
    end
	end

	def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end
end