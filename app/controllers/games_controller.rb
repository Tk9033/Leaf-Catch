class GamesController < ApplicationController
  def index
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      render json: {
        success: true,
        score: @game.score
      }
    else
      render json: {
        success: false,
        errors: @game.errors.full_messages
      }
    end
  end

  private

  def game_params
    params.require(:game).permit(:score)
  end
end
