class SectionsController < ApplicationController
	def index
		@sections = Section.includes(:board).where(board_id: params[:board_id]).order("id ASC").paginate(page: params[:page], per_page: 10)	
		render json: @sections
	end

	def create
		board = Board.find(params[:board_id])
	  section = board.sections.new(params[:section])
	  if section.save
	    render json: section
	  else
	    render nothing: true, status: :bad_request
	  end
	end

	def update
		section = Section.find(params[:id])
    if section.update_attributes(params[:section])
      render json: section
    else
      render nothing: true, status: :unprocessable_entity
    end
	end

	def destroy
    section = Section.find(params[:id])
    section.destroy
    head :no_content
  end

end
