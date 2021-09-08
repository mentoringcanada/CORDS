GCC=g++
MALLOC=/usr/include/malloc
INCLUDEDIR=-I$(MALLOC)
LIBDIR=-lm -pthread
CPPFLAGS = -O3 -Wall -march=native -funroll-loops -Wno-unused-result -Wno-int-to-pointer-cast
TARGET = one_off
OBJS = one_off.o Doc2Vec.o TrainModelThread.o Vocab.o NN.o TaggedBrownCorpus.o WMD.o

all: ${TARGET}

clean:
	rm -f *.o $(TARGET)

${TARGET} : $(OBJS)
	$(GCC) $(CPPFLAGS) $^ $(LIBDIR) -o $@

%.o	: %.cpp
	$(GCC) $(CPPFLAGS) -c $< -o $@ $(INCLUDEDIR)
