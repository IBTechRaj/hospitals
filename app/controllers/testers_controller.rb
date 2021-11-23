class TestersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: { message: "If you see this, you're logged in!" }
  end
end