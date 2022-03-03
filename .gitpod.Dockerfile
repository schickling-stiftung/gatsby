FROM gitpod/workspace-full:latest

RUN bash -c ". .nvm/nvm.sh     && nvm install 10.24.1     && nvm use 10.24.1     && nvm alias default 10.24.1"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
