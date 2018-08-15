class BoardsController < ApplicationController
	def index
		@boards = Board.where("").order('id ASC').paginate(page: 1, per_page: 10)
		render json: @boards
	end

	def create
	  board = Board.new(params[:board])
	  if board.save
	    render json: board
	  else
	    render nothing: true, status: :bad_request
	  end
	end

	def update
    @board = Board.find(params[:id])
    if @board.update_attributes(params[:board])
      render json: @board
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

	def destroy
    @board = Board.find(params[:id])
    @board.destroy
    head :no_content
  end
	
	private

		# def board_params
		#   params.require(:board).permit(:name, :description)
		# end
end
